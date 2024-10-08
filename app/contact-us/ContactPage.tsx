"use client";

import Link from "next/link";
import { FormEvent, FunctionComponent, ReactElement, useState } from "react";
import Input from "../components/ui/input";
import TextArea from "../components/ui/textarea";
import Button from "../components/ui/button";
import ContactSection from "../components/homepage/ContactSection";
import PageHero from "../components/shared/PageHero";
import { CustomerEnquiry } from "../models/ICustomerEnquiries";
import { toast } from "sonner";
import { useCreateCustomerEnquiry } from "../api/apiClient";

interface ContactPageProps {

}

const ContactPage: FunctionComponent<ContactPageProps> = (): ReactElement => {

    const createCustomerEnquiry = useCreateCustomerEnquiry();

    const [formValues, setFormValues] = useState<CustomerEnquiry>();
    const [isCreatingEnquiry, setIsCreatingEnquiry] = useState(false);

    function onFormValueChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        // Desctructure the name and value from the event target
        const { name, value } = e.target;

        setFormValues({ ...formValues as CustomerEnquiry, [name]: value });
    };

    async function handeCreateEnquiry(e: FormEvent<HTMLFormElement>) {
        // Prevent the default form submission
        e.preventDefault();

        // If all fields are not filled, show error
        console.log("🚀 ~ handeCreateEnquiry ~ formValues:", formValues)
        if (!formValues || !formValues?.firstName || !formValues.lastName || !formValues?.email || !formValues?.message) {
            toast.error("Please fill all fields, and try again.");
            return;
        }

        // Start loader
        setIsCreatingEnquiry(true);

        // Call the function to create customer enquiry
        await createCustomerEnquiry(formValues as CustomerEnquiry)
            .then((response) => {
                console.log(response);

                // Clear form values
                setFormValues(undefined);

                // Show success message
                toast.success("Your message has been sent successfully. We will get back to you soon.");
            })
            .catch((error) => {
                console.log(error);

                // Show error message
                toast.error("An error occurred while sending your message. Please try again later.");
            })
            .finally(() => {
                // Stop loader
                setIsCreatingEnquiry(false);
            });
    }

    return (
        <main className="flex flex-col items-center justify-center">
            <PageHero title="Contact Us" />
            <section className="py-10 flex flex-col items-center justify-center bg-app-grey-bg md:section lg:flex-row lg:justify-between lg:w-full lg:gap-10 lg:pb-16">
                <div className="p-7 flex flex-col gap-6 bg-app-grey-contact-bg/50 rounded-3xl shadow-2xl shadow-gray-200/70 lg:w-[35%] lg:pb-10">
                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold text-2xl text-primary-dark">We'd love to hear from you</h3>
                        <p className="text-primary-dark">Send us a message and we'll respond as soon as possible</p>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col">
                            <h4 className="font-bold text-lg text-primary-dark">Phone</h4>
                            <Link
                                href="tel:2347040256707"
                                className="text-secondary hover:text-dark-grey w-fit">
                                +234 704 025 6707,
                            </Link>
                            <Link href="tel:2348063145310"
                                className="text-secondary hover:text-dark-grey w-fit">
                                +234 806 314 5310
                            </Link>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="font-bold text-lg text-primary-dark">Email</h4>
                            <Link
                                href="mailto:info@yesilservices.com"
                                className="text-secondary hover:text-dark-grey w-fit">
                                info@yesilservices.com
                            </Link>
                        </div>
                    </div>
                </div>
                <form
                    onSubmit={(e) => handeCreateEnquiry(e)}
                    className="p-7 pt-14 pb-0 flex flex-col gap-5 w-full lg:w-[65%]">
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-1 lg:w-full">
                            <label htmlFor="firstName">First Name</label>
                            <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your first name"
                                onChange={onFormValueChange}
                                value={formValues?.firstName ?? ""}
                            />
                        </div>
                        <div className="flex flex-col gap-1 lg:w-full">
                            <label htmlFor="lastName">Last Name</label>
                            <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name"
                                onChange={onFormValueChange}
                                value={formValues?.lastName ?? ""}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email Address</label>
                        <Input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            onChange={onFormValueChange}
                            value={formValues?.email ?? ""}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="message">Message</label>
                        <TextArea
                            id="message"
                            name="message"
                            placeholder="Write us a message"
                            onChange={onFormValueChange}
                            value={formValues?.message ?? ""}
                        />
                    </div>
                    <Button
                        isLoading={isCreatingEnquiry}
                        disabled={isCreatingEnquiry}
                        type="submit"
                        className="lg:!w-fit lg:mx-auto">
                        Send Message
                    </Button>
                </form>
            </section>
            <ContactSection />
        </main>
    );
}

export default ContactPage;