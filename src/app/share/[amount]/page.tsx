import { redirect } from "next/navigation";

export default function ShareRedirectPage() {
    redirect("/");
    return null;
}
