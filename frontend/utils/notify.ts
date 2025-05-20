import { toast } from "vue-sonner";
export function notify(title: string, body: string) {
    toast.warning(title, {
        description: body,
        duration: 5000,
    });
}