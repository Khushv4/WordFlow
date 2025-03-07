import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '..';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (!userData) {
      console.error('User data is missing! Please log in.');
      return;
    }

    if (post) {
      const file = data.image[0] ? await appwriteService.uploatFile(data.image[0]) : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploatFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData?.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s/g, '-');
    return '';
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-4 p-4  bg-yellow-50 rounded-lg">
      <div className="w-full md:w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-5 w-full"
          {...register('title', { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-5 w-full"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues('content')} />
      </div>
      <div className="w-full md:w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-5 w-full"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image', { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full max-w-xs mx-auto"
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label="Status :"
          className="mb-3 w-full"
          {...register('status', { required: true })}
        />
        <Button type="submit" bgColor={post ? 'bg-green-500' : undefined} className="w-full hover:bg-amber-400">
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
