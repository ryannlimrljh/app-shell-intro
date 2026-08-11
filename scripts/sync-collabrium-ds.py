#!/usr/bin/env python3
"""Pull the Collabrium design system from the team repo, and report what it breaks.

    npm run sync:ds            # fetch, show the diff, update, run the drift check
    npm run sync:ds -- --check # report only, change nothing

WHY A PATH-SCOPED PULL AND NOT `git merge origin/main`
------------------------------------------------------
The design system and this prototype live in the SAME repo
(astroproductdesign/Collabrium-DS): `collabrium-dls/` is the system,
`pages/` is what we build on top of it. That makes `origin` already the right
remote — nothing to re-point. What was missing was the act of pulling.

A full merge is the wrong mechanism though. origin/main has moved 1,763 files
and +116k lines since this branch forked, including a vendored copy of
Chart.js, and this branch is what gets pushed to the `personal` remote and
deployed. Merging would drag all of it onto the deploy. So this takes the
`collabrium-dls/` path and nothing else, which is the only part the page links.

WHAT THE DRIFT CHECK IS FOR
---------------------------
Refreshing the CSS is the easy half. The half that bites is a class the page
uses that the new system has renamed or dropped: nothing errors, the rule
simply stops existing and the element loses its styling silently. That already
happened once — the whole .c-userpicker-* family was renamed to
.c-search-input-* in PR #22, and the page uses five of them.

Two checks run over every `c-*` class in the page's markup:

  DROPPED UPSTREAM  the CLASS was in the old components.css and is not in the
                    new one. Names a rename the moment it lands.
  UNSTYLED          neither the system nor the page's own <style> defines it.
                    True at any time, so worth running on its own.
  RULES REMOVED     the class survives but a SELECTOR targeting it is gone.
                    The sharpest of the three, and the only one that catches
                    `.c-sidebar-logo img{height:22px}` disappearing while
                    .c-sidebar-logo stays — which is exactly what blew the
                    sidebar logo up to its intrinsic size on this very sync.

All three are needed. A page-local state rule (.is-collapsed .c-userpicker-text)
is enough to hide a class from UNSTYLED while its base styling has vanished,
which is how .c-userpicker-text nearly slipped through.
"""
import argparse
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
DS_DIR = 'collabrium-dls'
# The design system is a SEPARATE repo now. It used to be `origin/main`, back
# when this prototype lived inside astroproductdesign/Collabrium-DS as a branch.
# Standing alone, `origin` is our own deploy repo, so the system needs its own
# fetch-only remote — see scripts/README.md for the topology.
DS_REMOTE = 'collabrium-ds'
UPSTREAM = f'{DS_REMOTE}/main'
# Every page that links the design system. Add to this list, do not widen it to
# a glob: a page that does NOT link the DS would produce meaningless findings.
PAGES = ['pages/landing-v1.html']


def git(*args, check=True):
    r = subprocess.run(['git', *args], cwd=ROOT, capture_output=True, text=True)
    if check and r.returncode:
        sys.exit(f'git {" ".join(args)} failed:\n{r.stderr.strip()}')
    return r.stdout.strip()


def classes_defined(css_text):
    """Every class a stylesheet defines. Selectors only — never declarations."""
    css_text = re.sub(r'/\*.*?\*/', '', css_text, flags=re.S)
    css_text = re.sub(r'\{[^{}]*\}', '{}', css_text)          # drop declaration bodies
    return set(re.findall(r'\.(c-[a-zA-Z0-9_-]+)', css_text))


def selectors_defined(css_text):
    """Every selector a stylesheet defines, normalised."""
    css_text = re.sub(r'/\*.*?\*/', '', css_text, flags=re.S)
    css_text = re.sub(r'@media[^{]*\{', '', css_text)
    out = set()
    for sel in re.findall(r'([^{}]+)\{[^{}]*\}', css_text):
        for one in sel.split(','):
            one = ' '.join(one.split())
            if one.startswith('.c-'):
                out.add(one)
    return out


def classes_used(html_text):
    """Every c-* class actually put on an element, from class="..." only."""
    used = set()
    for attr in re.findall(r'\bclass="([^"]*)"', html_text):
        for token in attr.split():
            if token.startswith('c-'):
                used.add(token)
    return used


def stamp_links(sha):
    """Version the DS <link> hrefs with the upstream SHA.

    Without this the sync silently does nothing you can see. The stylesheet
    URLs never change, so a browser that has them cached keeps serving the OLD
    css after a successful pull — measured: components.css on disk had
    .c-search-input-avatar while the page still had .c-userpicker rules live.
    Stamping the SHA changes the URL exactly when the content changes, so the
    refetch is automatic and nobody has to remember a hard reload.
    """
    changed = []
    for rel in PAGES:
        page = ROOT / rel
        if not page.exists():
            continue
        html = page.read_text()
        before = html
        html = re.sub(r'(href="\.\./' + DS_DIR + r'/(?:tokens|components)\.css)(?:\?v=[^"]*)?"',
                      rf'\1?v={sha}"', html)
        if html != before:
            page.write_text(html)
            changed.append(rel)
    return changed


def page_local_classes(html_text):
    """Classes the page defines for itself in its own <style> block."""
    local = set()
    for block in re.findall(r'<style[^>]*>(.*?)</style>', html_text, re.S):
        local |= classes_defined(block)
    return local


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--check', action='store_true',
                    help='report only; do not touch the working tree')
    args = ap.parse_args()

    dirty = git('status', '--porcelain', '--', DS_DIR)
    if dirty and not args.check:
        sys.exit(f'{DS_DIR}/ has uncommitted changes; commit or stash them first:\n{dirty}')

    remotes = git('remote').split()
    if DS_REMOTE not in remotes:
        sys.exit(f'No `{DS_REMOTE}` remote. Add it with:\n'
                 f'  git remote add {DS_REMOTE} https://github.com/astroproductdesign/Collabrium-DS.git')
    print(f'Fetching {DS_REMOTE} …')
    git('fetch', DS_REMOTE, '--quiet')

    diff = git('diff', '--stat', 'HEAD', UPSTREAM, '--', DS_DIR)
    if not diff:
        print(f'{DS_DIR}/ is already level with {UPSTREAM}.')
    else:
        behind = git('rev-list', '--count', f'HEAD..{UPSTREAM}', '--', DS_DIR)
        last = git('log', '-1', '--format=%ci  %s', UPSTREAM, '--', DS_DIR)
        print(f'\n{DS_DIR}/ is {behind} commit(s) behind {UPSTREAM}.')
        print(f'Newest upstream change: {last}\n{diff}\n')

    old_css = (ROOT / DS_DIR / 'components.css').read_text()

    if args.check:
        print('--check: leaving the working tree alone.\n')
        new_css = git('show', f'{UPSTREAM}:{DS_DIR}/components.css')
    else:
        if diff:
            # Path-scoped: takes collabrium-dls/ and nothing else. See the note
            # at the top for why this is not `git merge`.
            git('checkout', UPSTREAM, '--', DS_DIR)
            sha = git('rev-parse', '--short', UPSTREAM)
            stamped = stamp_links(sha)
            print(f'Updated {DS_DIR}/ from {UPSTREAM}. Review with: git diff --cached')
            if stamped:
                print(f'Stamped the DS <link> hrefs ?v={sha} in: {", ".join(stamped)}\n')
            else:
                print()
        new_css = (ROOT / DS_DIR / 'components.css').read_text()

    provided_new = classes_defined(new_css)
    provided_old = classes_defined(old_css)
    removed_selectors = selectors_defined(old_css) - selectors_defined(new_css)

    print('Drift check')
    print('-----------')
    broken_total = 0
    for rel in PAGES:
        page = ROOT / rel
        if not page.exists():
            print(f'  {rel}: missing, skipped')
            continue
        html = page.read_text()
        used, local = classes_used(html), page_local_classes(html)

        # TRANSITION check — only meaningful while old != new, i.e. during an
        # actual update. "The system used to provide this and no longer does."
        # Deliberately NOT filtered by `local`: the page often adds a
        # state-scoped rule on top of a DS class
        # (.c-sidebar.is-collapsed .c-userpicker-text{display:none}) and that is
        # not the same as providing the base styling. Filtering on it hid
        # .c-userpicker-text, which is the exact miss this tool exists to catch.
        dropped = sorted((used & provided_old) - provided_new)

        # STANDING check — true at any time, sync or not. "Nothing anywhere
        # styles this." Survives the case above only because a page-local
        # state rule genuinely does leave the class unstyled at its base.
        unstyled = sorted(used - provided_new - local)

        if dropped:
            broken_total += len(dropped)
            print(f'\n  DROPPED UPSTREAM — {rel}, {len(dropped)} class(es):')
            for c in dropped:
                print(f'    .{c}')
        if unstyled:
            broken_total += len(unstyled)
            print(f'\n  UNSTYLED — {rel} uses {len(unstyled)} c-* class(es) that neither '
                  f'the system nor the page defines:')
            for c in unstyled:
                print(f'    .{c}')
        # RULES REMOVED — the sharpest of the three, and the only one that
        # catches a class that still EXISTS while the rule targeting its
        # children is gone. That is not hypothetical: this sync dropped
        # `.c-sidebar-logo img{height:22px}` while keeping .c-sidebar-logo, and
        # the page's logo blew up to its intrinsic size with nothing flagged.
        # A selector counts as relevant when every class it names is on the
        # page — no DOM needed, and precise enough in practice.
        relevant = []
        for sel in sorted(removed_selectors):
            names = set(re.findall(r'\.(c-[a-zA-Z0-9_-]+)', sel))
            if names and names <= used and sel not in ('.' + c for c in dropped):
                relevant.append(sel)
        if relevant:
            broken_total += len(relevant)
            print(f'\n  RULES REMOVED — {rel}, {len(relevant)} selector(s) the system '
                  f'no longer defines but this page still relies on:')
            for sel in relevant[:12]:
                print(f'    {sel}')

        if not dropped and not unstyled and not relevant:
            print(f'\n  OK — {rel}: every c-* class it uses is styled by the system '
                  f'or by the page itself.')

    if broken_total:
        print(f'\n{broken_total} class(es) need migrating before this page is correct again.')
        return 1
    print('\nNothing broken.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
