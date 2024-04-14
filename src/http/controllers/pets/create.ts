import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterPetUseCase } from '../../../use-cases/factories/make-register-pet'
import { z } from 'zod'
import { MININUM_NAME_LENGTH } from '../../../constants/entities/pet'
import { randomUUID } from 'node:crypto'
import { writeUploadFile } from '../../../utils/write-file'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const formData: Record<string, unknown> = {}

  for await (const part of request.parts()) {
    if (part.type === 'file') {
      const fileBuffer = await part.toBuffer()

      const fileName = `pets-${randomUUID()}`

      try {
        const { path } = await writeUploadFile({
          fileName,
          folder: 'pets',
          fileBuffer,
        })

        formData.photo_url = `${path}/${fileName}`
      } catch (error) {
        reply.status(400).send('Error when trying to save photo')
      }
    }

    if (part.type === 'field') {
      const fieldName = part.fieldname
      const fieldValue = part.value

      formData[fieldName] = fieldValue
    }
  }

  const createPetSchemaFormData = z.object({
    name: z.string().min(MININUM_NAME_LENGTH),
    about: z.string(),
    age_id: z.coerce.string(),
    size_id: z.coerce.string(),
    energy_level_id: z.coerce.string(),
    level_of_independence_id: z.coerce.string(),
    environment_id: z.coerce.string(),
    org_id: z.coerce.string(),
    photo_url: z.string(),
    requirements: z.string().nullable(),
  })

  const data = createPetSchemaFormData.parse(formData)

  const registerPetUseCase = makeRegisterPetUseCase()

  const { pet } = await registerPetUseCase.execute(data)

  reply.status(201).send({ pet })
}
