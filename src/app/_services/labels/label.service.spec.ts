import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LabelService } from './label.service';
import { LabelMock } from '../../_mocks/labels/label.service.mock';

describe('LabelService', () => {
  let injector: TestBed;
  let service: LabelService;

  beforeEach(() => { TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [LabelService]
  });

  injector = getTestBed();
  service = injector.inject(LabelService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get Monitor labels', () => {
    service.labels = new LabelMock().monitorLabels;
    expect(service.labels.agent_discovered_os[0]).toEqual("linux");
  });

  it('should set and get Resource labels', () => {
    service.labels = new LabelMock().resourceLabels;
    expect(service.labels.agent_discovered_hostname[0]).toEqual('mr-anderson');
  });

  it('should return Resource labels', () => {
    service.getResourceLabels().subscribe(data => {
      expect(data).toEqual(new LabelMock().resourceLabels);
    });
  });

  it('should return Monitor labels', () => {
    service.getMonitorLabels().subscribe(data => {
      expect(data).toEqual(new LabelMock().monitorLabels);
    });
  });

});
