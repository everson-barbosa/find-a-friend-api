import { beforeEach, describe, expect, it } from "vitest";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { AuthenticateOrganizationUseCase } from "./authenticate-organization";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials";


describe('Use cases: Authenticate organization', () => {
    let organizationsRepository: OrganizationsRepository
    let sut: AuthenticateOrganizationUseCase
    
    beforeEach(() => {
        organizationsRepository = new InMemoryOrganizationsRepository()
        sut = new AuthenticateOrganizationUseCase(organizationsRepository)
    })
    it('should be able to authenticate an organization', async () => {
        const passwordHash = await hash('SomePassword123', 6)

        await organizationsRepository.create({
            accountable_name: "Everson",
            district_id: 1,
            email: "everson@gmail.com",
            postal_code: "12345123",
            whatsapp: "11999999999",
            password_hash: passwordHash,
        });

        const { organization } = await sut.execute({
            email: 'everson@gmail.com',
            password: 'SomePassword123'
        })

        expect(organization.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate an organization with a wrong e-mail', async () => {
        await organizationsRepository.create({
            accountable_name: "Everson",
            district_id: 1,
            email: "everson@gmail.com",
            postal_code: "12345123",
            whatsapp: "11999999999",
            password_hash: 'SomePassword123',
        });


        await expect(() => sut.execute({
            email: 'everson@gmail.com',
            password: 'SomePassword123'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate an organization with a wrong password', async () => {
        const passwordHash = await hash('SomePassword123', 6)

        await organizationsRepository.create({
            accountable_name: "Everson",
            district_id: 1,
            email: "everson@gmail.com",
            postal_code: "12345123",
            whatsapp: "11999999999",
            password_hash: passwordHash,
        });

        await expect(() =>sut.execute({
            email: 'everson@gmail.com',
            password: 'SomePassword12'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})