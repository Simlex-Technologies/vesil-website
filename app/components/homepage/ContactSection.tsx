"use client";

import { FunctionComponent, ReactElement } from "react";
import Button, { LinkButton } from "../ui/button";
import CustomImage from "../ui/image";
import images from "@/public/images";
import { motion } from "framer-motion";
import { ApplicationRoutes } from "@/app/constants/applicationRoutes";

interface ContactSectionProps {

}

const ContactSection: FunctionComponent<ContactSectionProps> = (): ReactElement => {
    return (
        <section className="bg-white py-14 px-0 lg:py-20 lg:section">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
                className="flex flex-col items-center justify-center gap-4 bg-primary-light2 rounded-3xl p-10 shadow-2xl shadow-gray-200 lg:flex-row">
                <div className="w-12 h-12 relative md:w-16 md:h-16">
                    <CustomImage src={images.logo} alt="logo" className="object-contain" />
                </div>
                <h2 className="text-2xl font-normal text-center lg:text-xl lg:mr-5 lg:whitespace-nowrap">Ready to Get a&nbsp;
                    <span className="text-primary font-bold">Growth Assistance for Your Business?</span>
                </h2>
                <LinkButton
                    url={ApplicationRoutes.Contact}
                    className="md:whitespace-nowrap">
                    Get Started
                </LinkButton>
            </motion.div>
        </section>
    );
}

export default ContactSection;