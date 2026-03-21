"use client";

import FormFieldWrapper from '@/components/common/form-field-wrapper';
import { ParticleGlobe } from '@/components/common/globe.model';
import StarBorder from '@/components/layout/star-border';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, MoveUpRight, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';

const ContactMe = ({ showContact = false }: { showContact?: boolean }) => {
    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-6 py-16'>
            {showContact ? <ContactSection /> : <GlobeSection />}
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
        <div className='w-full relative sm:ml-auto shrink-0 max-w-112.5 px-6 sm:px-10 xl:px-0'>
            <Card className='h-fit my-auto bg-transparent border-white/10 shadow-xl shadow-primary/20'>
                <CardHeader className='px-4 lg:px-6'>
                    <CardTitle className='text-2xl text-white'>
                        Get in Touch
                    </CardTitle>
                    <CardDescription className='-mt-2'>
                        You can reach me Anytime
                    </CardDescription>
                </CardHeader>
                <CardContent className='px-4 lg:px-6'>
                    <Form {...form}>
                        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup className="flex flex-col gap-2 text-white">
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 text-sm'>
                                    <FormFieldWrapper
                                        component={Input}
                                        control={form.control}
                                        name="name"
                                        placeholder="Full Name"
                                        required
                                    />
                                    <FormFieldWrapper
                                        component={Input}
                                        control={form.control}
                                        name="email"
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>
                                <FormFieldWrapper
                                    component={Textarea}
                                    control={form.control}
                                    name="message"
                                    placeholder="How can i help?"
                                    required
                                    className='min-h-30 lg:min-h-45 border-white/20'
                                />
                            </FieldGroup>
                            <StarBorder
                                className="h-12 w-full mt-6 lg:mt-8 font-jakarta-sans"
                                color="cyan"
                                speed="5s"
                            >
                                <p className="w-full h-full flex text-center items-center justify-center">
                                    Submit
                                </p>
                            </StarBorder>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className=" border-100 lg:border-200 border-transparent border-b-primary max-w-screen -z-10 blur-3xl absolute bottom-0  left-1/2 -translate-x-1/2" />

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