"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components";
import { LEGAL_ENTITY_ADDRESS, SUPPORT_EMAIL } from "@/config";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(200),
  email: z.string().trim().email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      toast.error(data.message ?? "Something went wrong. Please try again.");
      return;
    }

    toast.success("Message sent — we'll get back to you soon.");
    form.reset();
  };

  return (
    <div className="mx-auto max-w-[720px] px-6 py-16 sm:px-10">
      <h1 className="font-extrabold text-[36px] text-foreground tracking-[-0.02em]">
        Contact us
      </h1>
      <p className="mt-3 text-[#475569] text-[17px] leading-[1.6]">
        Have a question or want to talk to the team? Send us a message and we'll
        reply by email.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@yourfirm.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="How can we help?"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="self-start rounded-xl px-6.5 py-6 text-[16px]"
            isLoading={form.formState.isSubmitting}
          >
            Send message
          </Button>
        </form>
      </Form>

      <div className="mt-14 border-[#E2E8F0] border-t pt-8 text-[#475569] text-[15px] leading-[1.7]">
        <p>
          Prefer email? Reach us directly at{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-semibold underline"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
        <p className="mt-2">{LEGAL_ENTITY_ADDRESS}</p>
      </div>
    </div>
  );
};

export default ContactPage;
