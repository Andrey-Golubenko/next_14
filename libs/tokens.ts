import { v4 as uuidv4 } from 'uuid'
import { db } from '~/libs/db'
import { getVerificationTokenByEmail } from '~/services/verificationToken'
import { getPasswordResetTokenByEmail } from '~/services/passwordResetToken'
import { ONE_HOUR_EXPIRE } from '~/utils/constants/constants'

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = ONE_HOUR_EXPIRE

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id }
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = ONE_HOUR_EXPIRE

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id }
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return passwordResetToken
}