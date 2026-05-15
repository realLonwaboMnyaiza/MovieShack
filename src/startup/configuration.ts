export default function initialize(tokenKey: string | undefined) {
  if (!tokenKey) {
    throw new Error('Crucial environment variables are not defined.');
  }
}
