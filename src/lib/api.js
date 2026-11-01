export async function readApiJson(response) {
  const responseText = await response.text();
  try {
    return JSON.parse(responseText);
  } catch {
    if (responseText.trimStart().startsWith('<')) {
      throw new Error('The deployed site returned an HTML page instead of the admin API. Deploy the latest Vercel API routes and configure the server environment variables.');
    }
    throw new Error('The admin API returned an invalid response.');
  }
}
