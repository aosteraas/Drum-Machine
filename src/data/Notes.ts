import { notes } from './RawNotes';

export interface NoteData {
  freq: number;
  note: string[];
}

const noteData: NoteData[] = Object.keys(notes)
  // format the data as an array of objects
  .map(note => ({
    note,
    freq: notes[note]
  }))
  // map again to parse note into an array for when the same frequency
  // is the same for two notes.
  .map((n, idx, arr) => {
    const duplicate = arr.find(x => x.freq === n.freq && x.note !== n.note);
    const note = [n.note];
    if (duplicate) {
      note.push(duplicate.note);
    }
    return {
      note,
      freq: n.freq
    };
  })
  // filter out any duplicates preferring the first so when displaying it will
  // appear as `C#0/Db0`
  .filter((n, idx, arr) => {
    // if there's only one element in the note array then we are golden
    if (n.note.length === 1) {
      return true;
    }
    // otherwise take a cheap copy of the array from the current index + 1 and
    // see if any frequencies past this point match, and if so
    const arrCopy = arr.slice(idx + 1);
    const duplicateIndex = arrCopy.findIndex(x => x.freq === n.freq);
    return !duplicateIndex;
  });

// to get a 49 key keyboard we need to grab middle C and 24 either side of it
const middleC = noteData.find(n => n.note[0] === 'C4');
const middleCIndex = noteData.indexOf(middleC!);
const min = middleCIndex - 24;
const max = middleCIndex + 24;
const middleCKeys = noteData.slice(min, max);

export { noteData, middleCKeys };
