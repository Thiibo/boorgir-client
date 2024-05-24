import { ref } from "vue";

type NotificationType = "info" | "error";

export default class Notification {
    type: NotificationType;
    untranslatedMessage: string;
    creationTimeEpochMs: number;
    dismissTimeMs: number;
    get autoDismissProgress() {
        return (Date.now() - this.creationTimeEpochMs) / this.dismissTimeMs * 100;
    }

    static instances = ref<Notification[]>([]);

    private constructor(
        untranslatedMessage: string,
        type: NotificationType = "info",
        dismissTimeMs: number = 5000
    ) {
        this.type = type;
        this.untranslatedMessage = untranslatedMessage;
        this.creationTimeEpochMs = Date.now();
        this.dismissTimeMs = dismissTimeMs;
        Notification.instances.value.push(this);
    }

    public static create(untranslatedMessage: string, type?: NotificationType, dismissTimeMs?: number): Notification {
        return new this(untranslatedMessage, type, dismissTimeMs);
    }

    public dismiss(): void {
        const index = Notification.instances.value.findIndex(notification => notification === this);
        Notification.instances.value.splice(index, 1);
    }
}
