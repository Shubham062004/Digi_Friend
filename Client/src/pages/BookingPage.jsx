import React from 'react';
import { getCalApi } from "@calcom/embed-react";
import { Button } from '@/components/ui/button';

export default function BookingPage() {
  React.useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Book a Meeting
        </h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Select a time that works for you
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Choose from the available time slots to schedule your meeting.</p>
            </div>
            <div className="mt-5">
              <Button
                onClick={() => {
                  const cal = window.Cal;
                  if (cal) {
                    cal("ui", {
                      styles: { branding: { brandColor: "#000000" } },
                      hideEventTypeDetails: false,
                      layout: "month_view"
                    });
                  }
                }}
              >
                Schedule Meeting
              </Button>
            </div>
          </div>
          <div className="cal-embed-container" style={{ minHeight: "600px" }} />
        </div>
      </div>
    </div>
  );
}