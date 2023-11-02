import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '@/components/ui/button';
import AvatarUploader from '../shared/AvatarUploader'
import { UpdateProfileValidation } from '@/lib/validation';
import { useUserContext } from '@/context/AuthContext';
import { useToast } from '../ui/use-toast';
import { useUpdateUser } from '@/lib/react-query/queries';
import { PROFILE } from '@/constants/routes';
import Loader from '../shared/Loader';

const UpdateProfileFrom = () => {
  const navigate = useNavigate();
  const { user, checkAuthUser } = useUserContext();

  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateProfileValidation>>({
    resolver: zodResolver(UpdateProfileValidation),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || '',
      file: [],
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateProfileValidation>) {
    if (user) {
      const updatedUser = await updateUser({
        ...values,
        id: user.id,
        imageUrl: user.imageUrl,
      });
      if (!updatedUser) {
        toast({ title: 'Updating error... Please try again.' });
      }

      checkAuthUser();

      return navigate(`/${PROFILE}/${user.id}`);
    }
  }

  if (!user) return <Loader />;

  return (
    user && (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-9 w-full max-w-5xl'
        >
          <FormField
            control={form.control}
            name='file'
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel className='shad-form_label'>
                  Change profile photo
                </FormLabel> */}
                <FormControl>
                  <AvatarUploader
                    fieldChange={field.onChange}
                    mediaUrl={user?.imageUrl}
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Name</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className='shad-textarea custom-scrollbar'
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Username</FormLabel>
                <FormControl>
                  <Input {...field} type='text' className='shad-input' />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder='example@ya.ru'
                    className='shad-input'
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Bio</FormLabel>
                <FormControl>
                  <Input {...field} type='text' className='shad-input' />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />
          <div className='flex items-center justify-end gap-4'>
            <Button
              type='submit'
              className='shad-button_primary whitespace-nowrap capitalize'
            >
              {isUpdatingUser ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </Form>
    )
  );
};

export default UpdateProfileFrom;
