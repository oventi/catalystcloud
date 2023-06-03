import path from 'path'

import {get_s3, get_file_object, put_objects} from '../../lib/s3'
import {empty} from './empty'
import {put_data} from './put_data'
import {put_file, put_files} from './put_files'

export function containers({container: container_url}) {
  const {s3, container_name} = get_s3(container_url)

  return {
    empty: () => empty(s3, container_name),
    put_data: ({key, data, content_type}) => put_data(s3, container_name, key, data, content_type),
    put_file: ({file}) => put_file(s3, container_name, file),
    put_files: ({folder}) => put_files(s3, container_name, folder)
  }
}
