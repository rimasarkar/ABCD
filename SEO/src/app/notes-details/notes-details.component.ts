import { TitanService } from './../services/Titan/titan.service';
import { Component, OnInit } from '@angular/core';
import { Notes } from '../model/notes';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css']
})
export class NotesDetailsComponent implements OnInit {

  notes: Notes[];
  constructor ( private titanService: TitanService){};
  ngOnInit():void{
    this.titanService.getNotesByPrcsInstncID().subscribe(notesdata => {
      this.notes = notesdata.notes;
      console.log(this.notes);            
    },
      err => {
        console.log('An error has occured while retreving Notes data');
      })
     

  }
}