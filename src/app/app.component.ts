import { Component } from '@angular/core';
import {createWorker, RecognizeResult} from 'tesseract.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  result: any;
  language = 'ara+fra';
  private selectedFile: File;
  async onFileChange(event) {
    this.selectedFile = event.target.files[0];
    const worker = createWorker({
      logger: progress => {
      }
    });

    await worker.load();
    await worker.loadLanguage(this.language);
    await worker.initialize(this.language);


    try {
      const result = await worker.recognize(this.selectedFile);
      if (result) {
        this.result = (result as RecognizeResult).data;
      }
      console.log(this.result.text);
      await worker.terminate();
    } catch (e) {
      console.log(e);
    } finally {
    }
  }  
}

