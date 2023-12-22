interface FBUser {
  id: number;
  name: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    }
  }
}

export async function getAuthenticatedUser(token: string): Promise<FBUser> {
  const resp = await fetch(`https://graph.fb.gg/v18.0/me?fields=id%2Cname%2Cpicture&access_token=${token}`);
  if (!resp.ok) {
    throw new Error("Failed to fetch user");
  }
  return await resp.json();
}
