import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterPetUseCase } from '../../../use-cases/factories/make-register-pet'
import { z } from 'zod'
import {
  MININUM_NAME_LENGTH,
  ALLOWED_PHOTO_FORMATS,
} from '../../../constants/entities/pet'
import { randomUUID } from 'node:crypto'
import { saveUploadFile } from '../../../utils/save-upload-file'
import path from 'node:path'
import { ErrorSavingFile } from '../../../errors/saving-file'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetRequestBodySchema = z.object({
    name: z.object({ value: z.string().min(MININUM_NAME_LENGTH) }),
    about: z.object({ value: z.string() }),
    ageId: z.object({ value: z.string() }),
    sizeId: z.object({ value: z.string() }),
    energyLevelId: z.object({ value: z.string() }),
    levelOfIndependenceId: z.object({ value: z.string() }),
    environmentId: z.object({ value: z.string() }),
    requirements: z.object({ value: z.string() }),
    orgId: z.object({ value: z.string() }),
    photo: z.object({
      file: z.any(),
      mimetype: z
        .string()
        .refine((value) => ALLOWED_PHOTO_FORMATS.includes(value), {
          message: 'Invalid format',
        }),
      filename: z.string(),
    }),
  })

  const {
    name,
    about,
    ageId,
    energyLevelId,
    environmentId,
    levelOfIndependenceId,
    orgId,
    requirements,
    sizeId,
    photo,
  } = createPetRequestBodySchema.parse(request.body)

  const photoFolder = path.join('temp', 'uploads', 'pet', 'photo')
  const photoName = `pet-${randomUUID()}`

  try {
    await saveUploadFile({
      fileName: photoName,
      folder: photoFolder,
      fileStream: photo.file,
    })
  } catch (error) {
    reply.status(500).send(new ErrorSavingFile())
  }

  const registerPetUseCase = makeRegisterPetUseCase()

  const { pet } = await registerPetUseCase.execute({
    name: name.value,
    about: about.value,
    age_id: ageId.value,
    size_id: sizeId.value,
    energy_level_id: energyLevelId.value,
    environment_id: environmentId.value,
    level_of_independence_id: levelOfIndependenceId.value,
    org_id: orgId.value,
    photo_url: `${photoFolder}/${photoName}`,
    requirements: requirements.value,
  })

  reply.status(201).send({ pet })
}
