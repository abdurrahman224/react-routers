const Support = () => {
  const FAQItem = ({ question, answer, defaultChecked }) => (
    <div className="collapse collapse-arrow join-item border border-base-300">
      <input
        type="radio"
        name="faq-accordion"
        defaultChecked={defaultChecked}
      />
      <div className="collapse-title text-lg font-medium">{question}</div>
      <div className="collapse-content">
        <p>{answer}</p>
      </div>
    </div>
  );
  const faqs = [
    {
      id: 1,
      question: "How to add a new admin?",
      answer:
        "Go to User Management page and click on 'Add New User'. Select 'Admin' as the role.",
      defaultChecked: true,
    },
    {
      id: 2,
      question: "How to export analytics data?",
      answer:
        "Currently, you can view data in the Analytics tab. CSV export feature is coming soon.",
    },
    {
      id: 3,
      question: "Forgot password?",
      answer:
        "You can reset your password from the Settings > Security section.",
    },
  ];
  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Support & Help Center</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-white shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="join join-vertical w-full">
               {faqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  id={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  defaultChecked={faq.defaultChecked}
                />
              ))} 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;

// const Support = () => {
//   return (
//     <div className="p-6 bg-base-200 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Support & Help Center</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         <div className="lg:col-span-2 space-y-6">

//           <div className="card bg-white shadow-lg p-6">
//             <h2 className="text-xl font-bold mb-4">
//               Frequently Asked Questions
//             </h2>
//             <div className="join join-vertical w-full">
//               <div className="collapse collapse-arrow join-item border border-base-300">
//                 <input type="radio" name="my-accordion-4" defaultChecked />
//                 <div className="collapse-title text-lg font-medium">
//                   How to add a new admin?
//                 </div>
//                 <div className="collapse-content">
//                   <p>
//                     Go to User Management page and click on 'Add New User'.
//                     Select 'Admin' as the role.
//                   </p>
//                 </div>
//               </div>
//               <div className="collapse collapse-arrow join-item border border-base-300">
//                 <input type="radio" name="my-accordion-4" />
//                 <div className="collapse-title text-lg font-medium">
//                   How to export analytics data?
//                 </div>
//                 <div className="collapse-content">
//                   <p>
//                     Currently, you can view data in the Analytics tab. CSV
//                     export feature is coming soon.
//                   </p>
//                 </div>
//               </div>
//               <div className="collapse collapse-arrow join-item border border-base-300">
//                 <input type="radio" name="my-accordion-4" />
//                 <div className="collapse-title text-lg font-medium">
//                   Forgot password?
//                 </div>
//                 <div className="collapse-content">
//                   <p>
//                     You can reset your password from the Settings > Security
//                     section.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Support;
