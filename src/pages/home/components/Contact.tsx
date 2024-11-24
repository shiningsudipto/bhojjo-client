import { PhoneIcon } from "@heroicons/react/16/solid";
import contactImg from "../../../assets/bhojjo-contact.jpg";
import { Button } from "@material-tailwind/react";
const Contact = () => {
  return (
    <section className="section-gap-x grid lg:grid-cols-2 grid-cols-1 gap-10 items-center">
      <div className="space-y-5 text-lg">
        <h2 className="text-3xl font-bold">
          মোকামের সাথে ব্যবসা শুরু করুন এখনই
        </h2>
        <div>
          <p>কল করুন</p>
          <div className="inline-flex gap-2 mt-2">
            <div className="bg-primary rounded-full flex items-center">
              <PhoneIcon className="size-10  text-white p-1 " strokeWidth={2} />
            </div>
            <p className="text-3xl font-bold">01321215454</p>
          </div>
        </div>
        <div>
          <p>অথবা, আমাদের লিখুন</p>
          <Button className="bg-primary hover:bg-primary-500 mt-2">
            যোগাযোগ করুন
          </Button>
        </div>
      </div>
      <div>
        <img src={contactImg} alt="" />
      </div>
    </section>
  );
};

export default Contact;
