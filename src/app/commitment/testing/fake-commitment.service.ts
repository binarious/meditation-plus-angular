import {TestHelper} from '../../../testing/test.helper'
export class FakeCommitmentService {

  public constructor() {
  }

  public getAll() {
    return TestHelper.noRespose()

  }

  public get(id: string) {
    return TestHelper.noRespose()
  }

  public getCurrentUser() {
    return TestHelper.fakeResponse(
      {
        "_id": "3",
        "updatedAt": "2017-06-10T06:28:57.955Z",
        "createdAt": "2016-08-05T13:59:43.763Z",
        "type": "daily",
        "minutes": 20,
        "users": ["3", "4", "5"],
        "__v": 224
      }
    )
  }

  public save(commitment) {
    return TestHelper.noRespose()

  }

  public commit(commitment) {
    return TestHelper.noRespose()
  }

  public uncommit(commitment) {
    return TestHelper.noRespose()
  }

  public delete(commitment) {
    return TestHelper.noRespose()
  }

  /**
   * Determines the percentage of the reached goal.
   */
  public reached(meditations, commitment) {
    return 0
  }

}
