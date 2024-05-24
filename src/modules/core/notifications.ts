import { ref } from "vue";

type NotificationType = "info" | "error";

export default class Notification {
    type: NotificationType;
    message: string;
    creationTimeEpochMs: number;
    dismissTimeMs: number;
    get autoDismissProgress() {
        return (Date.now() - this.creationTimeEpochMs) / this.dismissTimeMs * 100;
    }

    static instances = ref<Notification[]>([]);

    private constructor(
        message: string,
        type: NotificationType = "info",
        dismissTimeMs: number = 5000
    ) {
        this.type = type;
        this.message = message;
        this.creationTimeEpochMs = Date.now();
        this.dismissTimeMs = dismissTimeMs;
        Notification.instances.value.push(this);
    }

    public static create(message: string, type?: NotificationType, dismissTimeMs?: number): Notification {
        return new this(message, type, dismissTimeMs);
    }

    public dismiss(): void {
        const index = Notification.instances.value.findIndex(notification => notification === this);
        Notification.instances.value.splice(index, 1);
    }
}
