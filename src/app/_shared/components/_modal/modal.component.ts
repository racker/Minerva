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
  
  @Output() triggerFuncCn = new EventEmitter();
  @Output() triggerFuncCf = new EventEmitter();
  

  ngOnInit(): void {
  }

  close() {
    this.triggerFuncCn.emit('close');
  }

  confirm() {
    this.triggerFuncCf.emit('confirm');

  }



}
