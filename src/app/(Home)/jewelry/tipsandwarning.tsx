import React from 'react';

const TipsAndWarnings = () => {
  const tips = [
    {
      title: "Understanding the 4Cs",
      content: "The 4Cs of diamond quality are Color, Clarity, Cut, and Carat Weight. Each C affects the overall appearance and value of a diamond. Be sure to check the certification for these details when purchasing."
    },
    {
      title: "Proper Care and Handling",
      content: "Diamonds and fine jewelry should be handled with care. Regular cleaning and inspections are recommended to maintain their sparkle and ensure their settings are secure."
    },
    {
      title: "Storage Solutions",
      content: "Store your jewelry in a lined box or a soft pouch to avoid scratches. Keep different jewelry pieces separated to prevent them from tangling or causing damage to each other."
    },
    {
      title: "Getting the Perfect Fit",
      content: "Ensure your ring fits perfectly by having your finger professionally measured at a jewelry store. Remember, your finger size can change with weather and time of day. If you're between sizes, choose the larger size for comfort."
    },
    {
      title: "Care for Delicate Jewelry",
      content: "Handle delicate jewelry with care. Avoid wearing fine jewelry during activities that may expose it to abrasion or impact. Always remove your jewelry before swimming, cleaning, or applying lotions and perfumes to prevent chemical damage."
    }
  ];

  return (
    <div className="flex flex-col">
      {tips.map((tip, index) => (
        <div key={index} className="p-4 m-2 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">{tip.title}</h3>
          <p className="text-gray-600 mt-2">{tip.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TipsAndWarnings;
