"use client";
export function SupportActions({
  booked,
  setBooked,
}: {
  booked: boolean;
  setBooked: (value: boolean) => void;
}) {
  return (
    <div className="sa-support-actions">
      <div>
        <h3>Apply independently or get expert support</h3>
        <p>
          Verify requirements on the official university site, or book a BRAC
          Career Hub professional to review your plan and documents.
        </p>
      </div>
      <div>
        <button
          onClick={() =>
            window.alert(
              "In production, this opens the selected university's official application page.",
            )
          }
        >
          Official application
        </button>
        <button className="hub-btn" onClick={() => setBooked(true)}>
          {booked ? "Call request received" : "Book a Career Hub call"}
        </button>
      </div>
    </div>
  );
}
