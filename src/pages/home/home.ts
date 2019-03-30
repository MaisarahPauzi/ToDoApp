import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mytasks:any = [];
  userinput:String;

  constructor(public navCtrl: NavController,private sqlite: SQLite) {

  }
  ionViewDidLoad() {
    this.getData();
  }
  
  ionViewWillEnter() {
    this.getData();
  }
  
  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS mytask(rowid INTEGER PRIMARY KEY, title TEXT)', [])
      .then(res => {
        console.log(res);
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));


    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM mytask ORDER BY rowid DESC', [])
      .then(res => {
        this.mytasks = [];
      for(var i=0; i<res.rows.length; i++) {
        this.mytasks.push({rowid:res.rows.item(i).rowid,title:res.rows.item(i).title})
      }
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  addData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO mytask VALUES(NULL,?)',[this.userinput])
      .then(res => {
        console.log(res);
        this.getData();
        this.userinput = "";
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));

    
  }
  
  
  
  deleteData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM mytask WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
}
