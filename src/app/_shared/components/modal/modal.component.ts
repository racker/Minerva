import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {


  constructor() { }

  @Input() modalType: string;
  @Input() message: string;
  @Input() id: string;
  
  @Output() triggerClose = new EventEmitter();
  @Output() triggerConfirm = new EventEmitter();
  

  ngOnInit(): void {
  }

  close() {
    this.triggerClose.emit('close');
  }

  confirm() {
    this.triggerConfirm.emit('confirm');

  }



}
