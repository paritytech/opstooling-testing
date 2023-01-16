import { RestEndpointMethodTypes } from "@octokit/rest";

import { getGitUserPayload, getUserPayload } from "./user";

export type Branch = RestEndpointMethodTypes["repos"]["getBranch"]["response"]["data"];

export function getBranchPayload(params: {
  name: string;
  commit: string;
  author: string;
  owner: string;
  repo: string;
}): Branch {
  return {
    name: params.name,
    commit: {
      sha: params.commit,
      node_id: "C_kwDOG7BDBtoAKGQ3ODg3NjMyOTRiODA5NGM2NjYyMDI5NDcyNWVkZmMzZjY1M2E0ZmY",
      commit: {
        author: getGitUserPayload({ login: params.name, email: `${params.name}@example.com` }),
        committer: getGitUserPayload({ login: params.name, email: `${params.name}@example.com` }),
        message: "update",
        tree: {
          sha: "f4bc34ee6337625ef10a3bc4973b7666d63aa0bc",
          url: `https://api.github.com/repos/${params.owner}/${params.repo}/git/trees/f4bc34ee6337625ef10a3bc4973b7666d63aa0bc`,
        },
        url: `https://api.github.com/repos/${params.owner}/${params.repo}/git/commits/${params.commit}`,
        comment_count: 0,
        verification: {
          verified: true,
          reason: "valid",
          signature:
            "-----BEGIN PGP SIGNATURE-----\n\niQIzBAABCAAdFiEEYTGIdVcKBmpiGQcYH+2DKISnpvUFAmLZJkIACgkQH+2DKISn\npvXfHg/8D3gTrmPHnIvSUse4p0OWrt2hLjwmZ4sJ4mVzplC8VPQAjgTTvxZljygA\nsQt5PooPfYZ9R7MMLSyXIGuuSpvR0O+KXTD5a74R4KcGX/nzrlxq+GVIZp/H42qG\nmOJUAl20mUf5uN57VZVvdDd1DM6qVqI6YGRfkDFQy1+muQpgd4HlBm+GnXhcRZUK\nhY2qHvjiHjBVhmiBEq0+TAiwT7yhrQogbCLfxngb0RblMgt6cp2922WcfcySCG1Z\nCx6b7yuYfRbg5Mq2QYS0yi2L7joknu/nBIOMeHqwJ1T35gVD8IFqeOY8pkEzUa2p\nYrP/lPKiu/IMc90TdlRoh5oF34NUCguiQJ0fDGjx1nNBaTkVDx0QFoIWMWTcHE/M\n+vaa6MnZW6oeZ2RNtdZZJCtNDQgWRenTiwgfBnD1KqqwENB/5KT0+WZu9F0S2PgH\nV+UaoDiRHUsGkL0ebKyIfER2FTG+lEs4XD7LZ6Y9Ot7GXUYpQVKlmgZ8SLcaNLwE\nhvhd2FxxdDA+Nf11+T2TQLcP81Jt3KTD7ODp2KB1IrGvqqk3rZZXWtbn7x+amYP6\nDoDpwG16bP/gEMka7HyM4CFA0tZ8oXJQBY+0c0fCvzGwzGQfWdOlhJr0XM7HNXow\nxqwq7rbT9hH/LYX5gFSNF/A5O8KgYyw/v+H7iJZ2bWL5LiCIVIc=\n=qDXU\n-----END PGP SIGNATURE-----",
          payload: `tree ${params.commit}\\nparent d9b886cd514e56ab95e1efd0505fe8388c9e9f1f\\nauthor ${params.name} <${params.name}@example.com> 1658398232 -0300\\ncommitter ${params.name} <${params.name}@example.com> 1658398274 -0300\\n\\nupdate\\n`,
        },
      },
      url: `https://api.github.com/repos/${params.owner}/${params.repo}/git/commits/${params.commit}`,
      html_url: `https://github.com/${params.owner}/${params.repo}/commit/${params.commit}`,
      comments_url: `https://api.github.com/repos/${params.owner}/${params.repo}/commits/${params.commit}/comments`,
      author: getUserPayload({ id: 77391175, login: params.author }),
      committer: getUserPayload({ id: 77391175, login: params.author }),
      parents: [
        {
          sha: "d9b886cd514e56ab95e1efd0505fe8388c9e9f1f",
          url: `https://api.github.com/repos/${params.owner}/${params.repo}/commits/d9b886cd514e56ab95e1efd0505fe8388c9e9f1f`,
          html_url: `https://github.com/${params.owner}/${params.repo}/commit/d9b886cd514e56ab95e1efd0505fe8388c9e9f1f`,
        },
      ],
    },
    _links: {
      self: `https://api.github.com/repos/${params.owner}/${params.repo}/branches/${params.name}`,
      html: `https://github.com/${params.owner}/${params.repo}/tree/${params.name}`,
    },
    protected: false,
    protection: { enabled: false, required_status_checks: { enforcement_level: "off", contexts: [], checks: [] } },
    protection_url: `https://api.github.com/repos/${params.owner}/${params.repo}/branches/${params.name}/protection`,
  };
}
