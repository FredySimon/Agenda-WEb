import { Component, OnInit, Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  @Input() data: any;

  constructor(private modalCtrl: ModalController, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('id').then((val) =>{
      console.log('Storage:', val)
    })
  }

  async close(){
    await this.modalCtrl.dismiss();
  }

}
