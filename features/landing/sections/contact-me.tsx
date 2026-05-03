"use client";

import FormFieldWrapper from '@/components/common/form-field-wrapper';
import Globe from '@/components/common/globe';
import { ParticleGlobe } from '@/components/common/globe.model';
import StarBorder from '@/components/layout/star-border';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, MoveUpRight, PhoneCall } from 'lucide-react'
import { UserIcon, Mail01Icon, ChatIcon } from 'hugeicons-react';
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';

const ContactMe = ({ showContact = false }: { showContact?: boolean }) => {
    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-6 py-16'>
            {showContact ? <ContactSection /> :
                <div className='flex flex-col gap-2 items-center h-full'>
                    <Globe />
                    <p className="text-muted-foreground md:text-base max-w-full px-6 text-center lg:text-sm text-xs sm:max-w-full -mt-3">Let’s turn your concept into a successful commercial product together!</p>
                    <Link href="/contact-me" className="w-fit mt-2">
                        <Button className="rounded-full border  !bg-white text-black border-white/20 hover:border-primary hover:text-white [&_svg]:size-2 relative group overflow-hidden w-fit">
                            <span className="relative z-10  flex gap-1 items-center">
                                Contact Me
                                <MoveUpRight />
                            </span>
                            <div className="absolute top-0 translate-y-full h-full w-full rounded-full group-hover:translate-y-0 transition-all duration-500 bg-primary"></div>
                        </Button>
                    </Link>
                </div>
            }
            <ContactMeForm />
        </div>
    )
}

export default ContactMe


const ContactSection = () => (
    <div className=" body-font flex flex-col mx-auto max-w-6xl font-preahvihear-sans px-6 sm:px-10 xl:px-0 my-auto text-center sm:text-left ">
        <p className="text-3xl sm:text-4xl">Contact</p>
        <p className='text-sm text-muted-foreground mt-1'>Email, call or Complete the form.</p>
        <div className="flex flex-col items-center sm:items-start  max-w-175.75 sm:text-lg text-sm mt-6">
            <p className='mt-3'>Let’s turn your concept into a successful commercial product together!</p>
            <Link target="_blank" href="mailto:pcsatpals@gmail.com" className="hover:underline font-light text-sm mt-3 lg:mt-6 flex gap-2 [&_svg]:size-4 items-center">
                <Mail />
                pcsatpals@gmail.com
            </Link>
            <Link target="_blank" href="tel:+917814104770" className="hover:underline font-light text-sm mt-3 lg:mt-6 flex gap-2 [&_svg]:size-4 items-center">
                <PhoneCall />
                78141-04770
            </Link>
        </div>
    </div >
)


const formSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.email().nonempty("email is required"),
    message: z.string().optional().nullable(),
})



const ContactMeForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: ""
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const request = fetch("/api/send", {
            method: "POST",
            body: JSON.stringify({
                ...data
            }),
        }).then(async (res) => {
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Something went wrong");
            return result;
        });

        toast.promise(request, {
            pending: "Sending your inquiry...",
            success: {
                render({ data }) {
                    return `${data.message || "Thank you for contacting me. I’ll get back to you soon."}`;
                },
            },
            error: {
                render({ data }: { data: Error }) {
                    return data.message || "Failed to save project 🤯";
                },
            },
        });

    }

    return (
        <div className='w-full relative shrink-0 max-w-112.5 sm:px-6 px-4 sm:ml-auto sm:my-auto mx-auto'>
            <div className="flex flex-col gap-8">
                {/* Highlighted Form Area (No Card) */}
                <div className="relative lg:p-8 p-4 lg:rounded-[2rem] rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl shadow-2xl transition-all duration-700 hover:shadow-primary/10 overflow-hidden group">
                    {/* Decorative glow inside */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative space-y-3">
                        <div>
                            <h2 className='text-3xl font-bold text-white tracking-tight'>
                                Get in <span className="text-primary">Touch</span>
                            </h2>
                            <p className='text-white/50 font-medium mt-2'>
                                Have a project in mind? Let's talk more.
                            </p>
                        </div>

                        <Form {...form}>
                            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="lg:space-y-5 space-y-3">
                                <FieldGroup className="flex flex-col gap-4">
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                        <div className="relative h-10">
                                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-white/30 transition-colors group-focus-within:text-primary" />
                                            <FormFieldWrapper
                                                component={Input}
                                                control={form.control}
                                                name="name"
                                                placeholder="Full Name"
                                                required
                                                className="pl-10 bg-white/[0.03] border-white/[0.1] focus:border-primary/50 transition-all duration-300 h-10"
                                            />
                                        </div>
                                        <div className="relative h-10">
                                            <Mail01Icon className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-white/30 transition-colors group-focus-within:text-primary" />
                                            <FormFieldWrapper
                                                component={Input}
                                                control={form.control}
                                                name="email"
                                                placeholder="Your Email"
                                                required
                                                className="pl-10 bg-white/[0.03] border-white/[0.1] focus:border-primary/50 transition-all duration-300 h-10"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <ChatIcon className="absolute left-4 top-5 size-4.5 text-white/30 transition-colors group-focus-within:text-primary" />
                                        <FormFieldWrapper
                                            component={Textarea}
                                            control={form.control}
                                            name="message"
                                            placeholder="How can i help you today?"
                                            required
                                            className='min-h-32 lg:min-h-40 pl-10 pt-4 bg-white/[0.03] border-white/[0.1] focus:border-primary/50 transition-all duration-300 resize-none'
                                        />
                                    </div>
                                </FieldGroup>

                                <div className="pt-2">
                                    <StarBorder
                                        className="h-12 w-full font-jakarta-sans"
                                        color="cyan"
                                        speed="5s"
                                    >
                                        <p className="w-full h-full flex text-center items-center justify-center">
                                            Submit
                                        </p>
                                    </StarBorder>
                                </div>
                            </form>
                        </Form>

                        {/* Interactive Footer Section */}
                        <div className="pt-3 border-t border-white/[0.05] flex flex-col gap-4">
                            <p className="text-[12px] text-white/30 leading-relaxed">
                                By submitting, you agree to my response time (usually under 24 hours).
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}



type GlobeSectionProps = {
    /** Optional height (Tailwind or plain CSS) */
    className?: string
}

export function GlobeSection({ className }: GlobeSectionProps) {
    return (
        <div className='flex flex-col gap-2 items-center h-full'>
            <div className={className ?? 'relative lg:h-100 h-80 w-full'}>
                <ParticleGlobe />
            </div>
            <p className="text-muted-foreground md:text-base max-w-full px-6 text-center lg:text-sm text-xs sm:max-w-full -mt-3">Let’s turn your concept into a successful commercial product together!</p>
            <Link href="/contact-me" className="w-fit mt-2">
                <Button className="rounded-full border  !bg-white text-black border-white/20 hover:border-primary hover:text-white [&_svg]:size-2 relative group overflow-hidden w-fit">
                    <span className="relative z-10  flex gap-1 items-center">
                        Contact Me
                        <MoveUpRight />
                    </span>
                    <div className="absolute top-0 translate-y-full h-full w-full rounded-full group-hover:translate-y-0 transition-all duration-500 bg-primary"></div>
                </Button>
            </Link>
        </div>
    )
}