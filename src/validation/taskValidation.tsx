import * as Yup from 'yup';

export const taskValidationSchema = Yup.object({
  description: Yup.string().required('Task description is required'),
  from: Yup.date().required('Start time is required'),
  to: Yup.date()
    .required('End time is required')
    .test('duration', 'Task cannot exceed 8 hours', function (value) {
      const { from } = this.parent;
      if (!from || !value) return true;

      const duration = (new Date(value).getTime() - new Date(from).getTime()) / (1000 * 60 * 60); // Convert to hours
      return duration <= 8;
    }),
});
