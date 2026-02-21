import { useState, useEffect } from "preact/hooks";

interface CalendarModeProps {
  onChange: (value: string) => void;
}

export default function CalendarMode({ onChange }: CalendarModeProps) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const formatIcalDate = (dateStr: string) => {
    if (!dateStr) return "";
    return dateStr.replace(/[-:]/g, "").split(".")[0] + "00Z";
  };

  useEffect(() => {
    if (!title.trim() || !startDate) {
      onChange("");
      return;
    }

    const start = formatIcalDate(startDate);
    const end = formatIcalDate(endDate || startDate); // Fallback end date to start date

    const ical = [
      "BEGIN:VEVENT",
      `SUMMARY:${title.trim()}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
    ];

    if (location.trim()) ical.push(`LOCATION:${location.trim()}`);
    if (description.trim()) ical.push(`DESCRIPTION:${description.trim()}`);

    ical.push("END:VEVENT");

    onChange(ical.join("\n"));
  }, [title, location, startDate, endDate, description, onChange]);

  return (
    <div className="calendar-mode">
      <div className="mb-3">
        <label htmlFor="titleInput" className="form-label small fw-bold">
          Event Title
        </label>
        <input
          type="text"
          id="titleInput"
          className="form-control"
          placeholder="e.g. Design Sync"
          value={title}
          onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="locationInput" className="form-label small fw-bold">
          Location
        </label>
        <input
          type="text"
          id="locationInput"
          className="form-control"
          placeholder="e.g. Google Meet / Room 402"
          value={location}
          onInput={(e) => setLocation((e.target as HTMLInputElement).value)}
        />
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label htmlFor="startInput" className="form-label small fw-bold">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            id="startInput"
            className="form-control"
            value={startDate}
            onInput={(e) => setStartDate((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="endInput" className="form-label small fw-bold">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            id="endInput"
            className="form-control"
            value={endDate}
            onInput={(e) => setEndDate((e.target as HTMLInputElement).value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="descInput" className="form-label small fw-bold">
          Description (Optional)
        </label>
        <textarea
          id="descInput"
          className="form-control"
          rows={2}
          placeholder="Event details..."
          value={description}
          onInput={(e) =>
            setDescription((e.target as HTMLTextAreaElement).value)
          }
        ></textarea>
      </div>

      <div className="form-text x-small mt-2">
        Scanning this will prompt the user to add the event to their calendar.
      </div>
    </div>
  );
}
