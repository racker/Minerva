import { TestBed } from '@angular/core/testing';
import { AdminUser } from 'projects/admin/src/app/_model/user.interface';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a null admin user', () => {
    expect(service.user).toBeUndefined();
  });

  it('should set and get admin user', () => {

    let user: AdminUser = {
      samAccountName: 'guy',
      emailaddress: 'guy@rackspace.com',
      CommonName: 'guy rogers',
      authorized: true
    };

    service.user = user;
    expect(user.CommonName).toEqual('guy rogers');
    expect(user.authorized).toEqual(true);

  })
});
