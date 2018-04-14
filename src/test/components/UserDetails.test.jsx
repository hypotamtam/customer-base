import React from 'react'
import usersData from '../data/usersData'
import { shallow, mount } from 'enzyme'
import { UserDetailComponent } from '../../main/components/UserDetail'
import Note from '../../main/components/Note'
import ContactDetail from "../../main/components/ContactDetail";

describe('<UserDetails /> should ', () => {
  it('display the notes', () => {
    const userDetailWrapper = shallow(<UserDetailComponent user={usersData[1]}/>)
    expect(userDetailWrapper.find(Note)).toHaveLength(usersData[1].notes.length)
    userDetailWrapper.find(Note).forEach((noteNode, index) => {
      expect(noteNode.props().note).toBe(usersData[1].notes[index])
    })

  })

  it('display the contact details', () => {
    const userDetailWrapper = shallow(<UserDetailComponent user={usersData[1]} />)
    expect(userDetailWrapper.find(ContactDetail)).toHaveLength(Object.keys(usersData[1].contactDetails).length)
    userDetailWrapper.find(ContactDetail).forEach((contactDetailNode) => {
      const key = contactDetailNode.props().type
      expect(contactDetailNode.props().value).toBe(usersData[1].contactDetails[key])
    })
  })

  it('display the notes', () => {
    const userDetailWrapper = shallow(<UserDetailComponent user={usersData[1]} />)
    expect(userDetailWrapper.find(Note)).toHaveLength(usersData[1].notes.length)
    userDetailWrapper.find(Note).forEach((noteNode, index) => {
      expect(noteNode.props().note).toBe(usersData[1].notes[index])
    })

  })

  it('allow the note edition', () => {
    let editedNote = ''
    let editedNoteIndex = -1
    const callback = (note, index) => {
      editedNote = note
      editedNoteIndex = index
    }
    const userDetailWrapper = shallow(<UserDetailComponent user={usersData[0]} updateNote={callback} />)
    const notesWrapper = userDetailWrapper.find(Note)
    expect(notesWrapper).toExist()
    notesWrapper.props().onInputChange('new text')

    expect(editedNoteIndex).toBe(0)
    expect(editedNote).toBe("new text")
  })

  it('allow to add a note edition', () => {
    let isCalled = false
    const callback = () => { isCalled = true }
    const userDetailWrapper = mount(<UserDetailComponent user={usersData[0]} addNote={callback} />)
    const addNoteButtonWrapper = userDetailWrapper.find('#AddNoteBtn')
    expect(addNoteButtonWrapper).toExist()
    addNoteButtonWrapper.simulate('click')
    expect(isCalled).toBe(true)
  })
})