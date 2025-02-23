#!/bin/bash
set -euxo pipefail

registry=''
args=()

package_json="package.json"
tmpdir="$(mktemp -d)"

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --github)
        registry='https://npm.pkg.github.com'
        jq ".name = \"@${GITHUB_ACTOR}/\" + .name" "./${package_json}" >"${tmpdir}/${package_json}"
        ;;
        --npm)
        registry='https://registry.npmjs.org'
        cp "./${package_json}" "${tmpdir}/${package_json}"
        ;;
        --dry-run)
        args+=("$1");
        shift
        ;;
        *)
        echo "Unknown argument $1"
        exit 1
        ;;
    esac
    shift
done

cd "${tmpdir}"
bun publish "${args[@]}" --registry="${registry}"
