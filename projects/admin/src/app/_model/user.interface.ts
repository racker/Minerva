export interface AdminUser {
    givenname?: string;
    surname?: string;
    samAccountName: string;
    emailaddress: string;
    CommonName: string;
    authorized: boolean;
}
