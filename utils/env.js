export function getEnvVar(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `${name} Environment Variable is not set. Add it to .env file`,
    );
  }

  return value;
}
