//'use client';

import React from 'react';
import UserCard from '@/components/cards/user-desc-card-component';
import styles from './page.module.scss';
import ReviewList from "@/components/lists/review-list.component";
import { notFound } from 'next/navigation';
//import { getUserMediaById } from '@/lib/db/users';
import { User, UserMedia } from "@prisma/client";
import { getUserById, getUserMedias } from '@/lib/db/users';
import ClientSupabaseImage from './profile-image';

type Props = {
    params: Promise<{
      slug: string;
    }>;
  };

const ProfilePage = async ({ params }: Props) => {
    const slug = (await params).slug;
    const user = await getUserById(slug);
    
    if (!user) notFound();
    const userMediaResult = await getUserMedias(user.id);
    const data: Partial<User & { medias: Partial<UserMedia>[] }> = {
        ...user,
        medias: userMediaResult || []
      };

    return (
        <>
        <div>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <ClientSupabaseImage src={user?.image ?? undefined} />
                </div>
                <div className={styles.userCardContainer}>
                    <UserCard data={data} socials={true} />
                </div>
            </div>
            <div className={styles.revievLikedsection}>
                <ReviewList mode="author" authorId={user.id}></ReviewList>
            </div>
        </div>
        </>
    );
};

// ...existing code...

export default ProfilePage;