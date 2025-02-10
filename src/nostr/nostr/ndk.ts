import { time_now_ms, type NostrMetadataTmp } from '$root';
import NDK, { NDKEvent, NDKPrivateKeySigner, NDKUser } from '@nostr-dev-kit/ndk';

export const ndk_init = async (opts: {
    $ndk: NDK;
    secret_key: string;
}): Promise<NDKUser | undefined> => {
    try {
        const { $ndk: ndk, secret_key } = opts;
        const signer = new NDKPrivateKeySigner(secret_key);
        ndk.signer = signer;

        const user = await signer.user();
        if (user) {
            user.ndk = ndk;
            return user;
        }
    } catch (e) {
        console.log(`(error) ndk_init `, e);
    };
};

export const ndk_event_metadata = async (opts: {
    $ndk: NDK;
    $ndk_user: NDKUser;
    metadata: NostrMetadataTmp
}): Promise<NDKEvent | undefined> => {
    try {
        const { $ndk, $ndk_user } = opts;
        const ev = await ndk_event({
            $ndk,
            $ndk_user,
            basis: {
                kind: 0,
                content: JSON.stringify(opts.metadata),
            },
        });
        return ev;
    } catch (e) {
        console.log(`(error) ndk_event_metadata `, e);
    }
};

export const ndk_event = async (opts: {
    $ndk: NDK;
    $ndk_user: NDKUser;
    basis: {
        kind: number;
        content: string;
        tags?: string[][];
    }
}): Promise<NDKEvent | undefined> => {
    try {
        const { $ndk: ndk, $ndk_user: ndk_user, basis } = opts;
        const time_now = time_now_ms();

        const tags: string[][] = [
            ['published_at', time_now.toString()],
        ];

        if (basis.tags && basis.tags?.length > 0) for (const tag of basis.tags) tags.push(tag);

        const event: NDKEvent = new NDKEvent(ndk, {
            kind: basis.kind,
            pubkey: ndk_user.pubkey,
            content: basis.content,
            created_at: time_now,
            tags
        });
        return event;
    } catch (e) {
        console.log(`(error) ndk_event `, e);
    };
};
