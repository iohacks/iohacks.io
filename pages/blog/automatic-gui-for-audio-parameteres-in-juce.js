import markdown from 'markdown-in-js'
import WithDoc, { components } from '~/lib/with-doc'

import Image from '~/components/Image'
import Code from '~/components/Code'

export default WithDoc({
  title: 'Automatic GUI for Audio Parameters in Juce',
  description: 'How to create a GUI for Audio Parameters in the prototyping stage of a audio plugin.',
  image: 'https://user-images.githubusercontent.com/50838/66273319-75c09200-e890-11e9-9ae4-a75fc4a914f0.png',
  slug: 'automatic-gui-for-audio-parameteres-in-juce',
  date: 'October 06, 2019'
})(markdown(components)`

These days, GUI is a major deciding factor for a good audio plugin. But when we are prototyping or just experimenting, we don't care about the GUI.

We simply need a set of controls to modify the plugin parameters.

Fortunately, with [Juce](https://juce.com/), you have two options:

## 1. Do Not Provide an Editor

The first option is simple. We simply don't provide a GUI for our plugin. Rather, the host (usually a DAW) will provide a GUI for our parameters. 

Ableton Live always shows the GUI for parameters, and it's pretty good.

${
  <Image
    src='https://user-images.githubusercontent.com/50838/66273259-f468ff80-e88f-11e9-8ece-cd1155294710.png' 
    title='How Ableton Live shows parameters.' 
  />
}

You can easily implement this by returning \`false\` from the method \`hasEditor\` in the PluginProcessor.

${
  <Code language="cpp">{`
bool JuceAutoParamsAudioProcessor::hasEditor() const
{
    return false;
}
  `}</Code>
}

## 2. Use the Generic Editor Provided by Juce

In Ableton Live, the default GUI for parameters is pretty nice and easy to use. But in some other DAWs, that's not the case.

${
  <Image
    src='https://user-images.githubusercontent.com/50838/66272725-f086ae80-e88a-11e9-9614-95e473ba34b1.png' 
    title='How Reaper shows the default GUI for a plugin which has no GUI.' 
  />
}

In that case, we can use the built-in Editor provided by Juce. It'll try to create a GUI for the parameters we defined in the PluginProcessor.

Enabling that is also very easy. 

  1. Make sure you return \`true\` from the \`hasEditor\` method.
  2. Return \`new GenericAudioProcessorEditor (*this)\` from the \`createEditor\` method.

${
  <Code language="cpp">{`
bool JuceAutoParamsAudioProcessor::hasEditor() const
{
    return true;
}

AudioProcessorEditor* JuceAutoParamsAudioProcessor::createEditor()
{
    return new GenericAudioProcessorEditor (*this);
}
  `}</Code>
}

Then you can see a GUI like this for our parameters.

${
  <Image
    src='https://user-images.githubusercontent.com/50838/66272724-f086ae80-e88a-11e9-8be8-804dc691f6c9.png' 
    title='How Reaper shows the default plugin editor GUI.'
  />
}

You can inspect the complete plugin code at [iohacks/JuceAutoParams](https://github.com/iohacks/JuceAutoParams).

## Kudos

I want to thank [Xenakios](https://forum.juce.com/u/Xenakios) for [pointing out](https://forum.juce.com/t/gui-builder-for-the-prototyping-stage-for-parameters/35522/2?u=arunoda) these options.

`)

