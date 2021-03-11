import { TestBed, async } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'env/environment';
import { AdminUser } from 'projects/admin/src/app/_model/user.interface';
import { of } from 'rxjs';
import { AdminService } from '../admin/admin.service';
import { AuthGuardService } from './auth.guard';


describe('AuthGuardService', () => {
    let service: AuthGuardService;
    let adminService: AdminService;
    const usr= {
        samAccountName: 'guy',
        emailaddress: 'guy@rackspace.com',
        CommonName: 'guy rogers',
        authorized: true
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AdminService,
                AngularFireAuth,
                AuthGuardService
            ],
            imports: [
                AngularFireModule.initializeApp(environment.firebase)
            ]
        });
        service = TestBed.inject(AuthGuardService);
        adminService = TestBed.inject(AdminService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    /* TODO: this can't be tested currently - the guard will return true when in mock mode
    xit('should first look if user is authenticated', async(done) => {
        adminService.user =usr;
        let spy = spyOnProperty(adminService, 'user', 'set');
        await service.canActivate();
        expect(spy).toHaveBeenCalled();
        done();
    });
    */

    it('should authenticate admin', async(done) => {
        adminService.user = usr
        let guard = await service.canActivate();
        expect(guard).toEqual(true);
        done();
    });

    afterEach(() => {
        adminService.user = null;
    })

});