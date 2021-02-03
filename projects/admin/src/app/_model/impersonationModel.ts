interface Token {
    expires: Date,
    "RAX-AUTH:issued": Date,
    "RAX-AUTH:authenticatedBy": [string],
    id: string;
}
interface Access {
    token: Token;
}

export interface ImpersonationToken {
    access: Access;
}

export interface impUser {
    "RAX-AUTH:impersonation": {
        user: {
            username: string
        }
    }
}