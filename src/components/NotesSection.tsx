interface NotesSectionProps {
  notes: string;
  onNotesChange: (value: string) => void;
}

export default function NotesSection({ notes, onNotesChange }: NotesSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={4}
        placeholder="Any additional notes or terms..."
      />
    </div>
  );
}
