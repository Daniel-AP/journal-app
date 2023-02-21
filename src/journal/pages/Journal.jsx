import { useSelector } from "react-redux";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView } from "../views/NoteView";
import { NothingSelected } from "../views/NothingSelected";

export const Journal = () => {

  const activeNote = useSelector(state => state.journal.active);

  return (  
    <JournalLayout>
      {
        activeNote
        ? (
          <NoteView />
        )
        : (
          <NothingSelected />
        )
      }
    </JournalLayout>
  )
}