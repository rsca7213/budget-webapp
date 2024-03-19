import { Injectable } from '@nestjs/common'
import { IHashService } from '../../../app/interface/hash-service.interface'

@Injectable()
export class HashService implements IHashService {
  public hashes: string[] = [
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVW',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVX',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVY',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVZ',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVA',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVB',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVC',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVD',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVE',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVF',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVG',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVH',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVI',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVJ',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVK',
    '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVL'
  ]

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async hash(value: string): Promise<string> {
    return Promise.resolve(this.hashes.shift() || '')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public compare(value: string, hash: string): Promise<boolean> {
    return Promise.resolve(true)
  }
}
