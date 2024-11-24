import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { faqs } from "../helper";
import { useState } from "react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const FAQ = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <section className="section-gap-x section-gap-y">
      <h2 className="text-3xl font-bold text-center">
        Frequently Asked Questions
      </h2>
      <div>
        {faqs.map((item, index) => (
          <Accordion
            key={index}
            open={open === index}
            icon={<Icon id={1} open={open} />}
          >
            <AccordionHeader onClick={() => handleOpen(index)}>
              {item.question}
            </AccordionHeader>
            <AccordionBody>{item.answer}</AccordionBody>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
