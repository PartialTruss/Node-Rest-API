import { describe, expect, it, jest } from "@jest/globals";
import { getUser } from "../controllers/user";


const mockRequest = {
    id: "682"
}

const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};

describe("get users", () => {
    it("should get user by id", () => {
        getUser(mockRequest as any, mockResponse as any)
        expect(mockResponse.status).toHaveBeenCalled()
    })

})