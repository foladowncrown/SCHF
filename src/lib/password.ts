import crypto from "crypto"

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex")
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err)
      resolve(`${salt}:${derivedKey.toString("hex")}`)
    })
  })
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  if (!hashedPassword || !hashedPassword.includes(":")) {
    return false
  }
  const [salt, hash] = hashedPassword.split(":")
  const passwordHash = await hashPasswordWithSalt(password, salt)
  return passwordHash === hash
}

async function hashPasswordWithSalt(
  password: string,
  salt: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err)
      resolve(derivedKey.toString("hex"))
    })
  })
}
